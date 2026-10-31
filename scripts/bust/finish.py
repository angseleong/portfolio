"""Raw image-to-3D head + classical bust template -> bust.glb + bust-lite.glb (ARCHITECTURE.md §5).

    /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/bust/finish.py -- \
        scripts/bust/src/raw.glb scripts/bust/src/template/marble_bust_01_1k.gltf public/models

The head comes from the scan. The neck, shoulders, chest and plinth come from Poly Haven's Marble Bust 01 (CC0,
Rico Cilliers), whose own head is cut off. The two are fused by a coarse voxel remesh and decimated into a
low-poly mosaic (flat facets): a fine remesh destroys the scan's hair, which is made of thin sheets.
Blender is Z up and both faces look toward -Y; the numbers below were read off these two meshes.
"""
import sys

import bmesh
import bpy
import numpy as np
from mathutils import Matrix

SCAN, TEMPLATE, OUT = sys.argv[-3:]
PREVIEW = SCAN.rsplit("/", 1)[0] + "/preview.blend"
TARGETS = {"bust.glb": 6_000, "bust-lite.glb": 3_000}  # triangles, i.e. mosaic facets; largest first

CUT_LIFT, CUT_SLOPE = 0.03, 0.2  # the scan is cut just above the chin, along a plane that rises toward the nape
TEMPLATE_CHIN = 0.258  # under the template's jaw; its head is everything above this
SHOULDERS = (0.12, 0.21)  # template heights whose main axis is the shoulder line
NECK_BLEND, NECK_FRONT = 0.04, 0.45  # how far down the neck widens to meet the head, and how far under the jaw it reaches
HEAD_TURN = 35  # degrees; the template neck was carved for about 43
TUCK = 0.004  # the template neck reaches this far up inside the scan head, so no gap shows
HEIGHT = 2.0
MOSAIC_VOXEL = 0.02  # in HEIGHT units: coarse enough to fuse the hair sheets into solid locks


def select_only(o):
    bpy.ops.object.select_all(action="DESELECT")
    o.select_set(True)
    bpy.context.view_layer.objects.active = o


def tris(o):
    return sum(len(p.vertices) - 2 for p in o.data.polygons)


def get_co(me):
    co = np.empty(len(me.vertices) * 3)
    me.vertices.foreach_get("co", co)
    return co.reshape(-1, 3)


def set_co(me, co):
    me.vertices.foreach_set("co", co.ravel())
    me.update()


def load(path):
    """Import one file as a single mesh with transforms applied and no materials, UVs or colors."""
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    meshes = [o for o in bpy.data.objects if o not in before and o.type == "MESH"]
    select_only(meshes[0])
    for o in meshes:
        o.select_set(True)
    bpy.ops.object.join()
    obj = bpy.context.view_layer.objects.active
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    me = obj.data
    me.materials.clear()
    while me.uv_layers:
        me.uv_layers.remove(me.uv_layers[0])
    while me.color_attributes:
        me.color_attributes.remove(me.color_attributes[0])
    return obj


def bisect(obj, co, no, keep_below):
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
    bmesh.ops.bisect_plane(bm, geom=geom, plane_co=co, plane_no=no, clear_inner=not keep_below, clear_outer=keep_below)
    if not keep_below:
        cap = bmesh.ops.holes_fill(bm, edges=[e for e in bm.edges if e.is_boundary], sides=0)
        bmesh.ops.triangulate(bm, faces=cap["faces"])
    bm.to_mesh(obj.data)
    bm.free()


bpy.ops.wm.read_factory_settings(use_empty=True)

# 1. Template: turn it so the shoulders run along X and the chest faces -Y.
body = load(TEMPLATE)
co = get_co(body.data)
band = co[(co[:, 2] > SHOULDERS[0]) & (co[:, 2] < SHOULDERS[1])][:, :2]
axis = np.linalg.svd(band - band.mean(axis=0))[2][0]
# The axis has no sign; of the two turns, take the smaller one, since the template's face already looks
# roughly toward -Y and a head never turns more than 90° from the chest.
angle = (-np.arctan2(axis[1], axis[0]) + np.pi / 2) % np.pi - np.pi / 2
body.data.transform(Matrix.Rotation(angle, 4, "Z"))
co = get_co(body.data)
head_part = co[co[:, 2] > TEMPLATE_CHIN]
t_lo, t_hi = head_part.min(axis=0), head_part.max(axis=0)
print("FINISH template turned", np.degrees(angle), "head", t_lo, t_hi)

# 2. Scan: keep the head, cut under the chin, cap the opening, and fit it where the template's head was.
head = load(SCAN)
co = get_co(head.data)
chin = co[(co[:, 1] < -0.35) & (co[:, 2] > 0.6) & (abs(co[:, 0]) < 0.2)][:, 2].min()
cut_z = chin + CUT_LIFT
bisect(head, (0, -0.5, cut_z), (0, -CUT_SLOPE, 1), keep_below=False)
co = get_co(head.data)
s_lo, s_hi = co.min(axis=0), co.max(axis=0)
scale = (t_hi[2] - TEMPLATE_CHIN) / (s_hi[2] - chin)  # match chin-to-crown heights
offset = (t_lo + t_hi) / 2 - (s_lo + s_hi) / 2 * scale
offset[2] = TEMPLATE_CHIN - chin * scale  # chins line up
co = co * scale + offset
# The template's neck was carved for a head turned toward +X; turn the scan's head part of the way to match.
pivot = (co.min(axis=0) + co.max(axis=0)) / 2
turn = np.radians(HEAD_TURN) * np.sign(angle)
rot = np.array([[np.cos(turn), -np.sin(turn)], [np.sin(turn), np.cos(turn)]])
co[:, :2] = (co[:, :2] - pivot[:2]) @ rot.T + pivot[:2]
set_co(head.data, co)
print("FINISH scan chin", chin, "scale", scale, "offset", offset)

# 3. Cut the template's head off along the scan's cap plane, a little higher so the neck tucks inside.
plane_co = np.array((0, -0.5, cut_z)) * scale + offset + np.array((0, 0, TUCK))
plane_co[:2] = (plane_co[:2] - pivot[:2]) @ rot.T + pivot[:2]
plane_no = (*(rot @ np.array((0, -CUT_SLOPE))), 1)
bisect(body, tuple(plane_co), plane_no, keep_below=True)
# Fit the top of the neck to the outline of the head's cut: all the way out at the nape and sides, so hair
# flows into neck with no ledge, and further in under the jaw, which should overhang the throat.
head_co = get_co(head.data)
n = np.array(plane_no) / np.linalg.norm(plane_no)
rim = head_co[abs((head_co - (plane_co - np.array((0, 0, TUCK)))) @ n) < 1e-5]
co = get_co(body.data)
top = co[:, 2].max()
neck = co[co[:, 2] > top - 0.02]
axis_xy = (neck[:, :2].min(axis=0) + neck[:, :2].max(axis=0)) / 2
bins = np.linspace(-np.pi, np.pi, 73)


def outline(points):
    """Largest radius from the neck axis in each of 72 directions, gaps filled around the circle."""
    d = points[:, :2] - axis_xy
    phi, r = np.arctan2(d[:, 1], d[:, 0]), np.hypot(d[:, 0], d[:, 1])
    idx = np.clip(np.digitize(phi, bins) - 1, 0, 71)
    radius = np.full(72, np.nan)
    for i in range(72):
        if (idx == i).any():
            radius[i] = r[idx == i].max()
    ok = ~np.isnan(radius)
    mids = (bins[:-1] + bins[1:]) / 2
    return np.interp(mids, mids[ok], radius[ok], period=2 * np.pi)


head_r = outline(rim)
neck_r = outline(neck)
front = np.arctan2(*(rot @ np.array((0, -1)))[::-1])  # the face's direction after the turn
mids = (bins[:-1] + bins[1:]) / 2
# 1 at the nape, NECK_FRONT under the jaw; squared so the sides stay in too (else a fin pokes out under the jaw)
reach = NECK_FRONT + (1 - NECK_FRONT) * ((1 - np.cos(mids - front)) / 2) ** 2
stretch = np.maximum(head_r * reach / neck_r, 1)  # never narrower than the template's own neck
d = co[:, :2] - axis_xy
idx = np.clip(np.digitize(np.arctan2(d[:, 1], d[:, 0]), bins) - 1, 0, 71)
t = np.clip((co[:, 2] - (top - NECK_BLEND)) / NECK_BLEND, 0, 1)
co[:, :2] = axis_xy + d * (1 + (stretch[idx] - 1) * (t * t * (3 - 2 * t)))[:, None]
set_co(body.data, co)
print("FINISH rim points", len(rim))

# 4. Center on the turning axis and scale to HEIGHT so the camera in BustScene.tsx frames it.
both = np.vstack([get_co(head.data), get_co(body.data)])
lo, hi = both.min(axis=0), both.max(axis=0)
for obj in (head, body):
    set_co(obj.data, (get_co(obj.data) - (lo + hi) / 2) * HEIGHT / (hi[2] - lo[2]))
print("FINISH tris head", tris(head), "body", tris(body))

# 5. Mosaic (owner's call): fuse head and body with a coarse voxel remesh, which also hides the neck joint and
# the scan's ragged hair, then cut it down to flat facets. Each target is decimated from the one before.
select_only(head)
body.select_set(True)
bpy.ops.object.join()
bust = bpy.context.view_layer.objects.active
bust.data.remesh_voxel_size = MOSAIC_VOXEL
bpy.ops.object.voxel_remesh()
for name, target in TARGETS.items():
    while tris(bust) > target * 1.1:  # one Decimate pass can fall short
        dec = bust.modifiers.new("dec", "DECIMATE")
        dec.ratio = target / tris(bust)
        bpy.ops.object.modifier_apply(modifier=dec.name)
    bpy.ops.object.shade_flat()
    bpy.ops.export_scene.gltf(
        filepath=f"{OUT}/{name}",
        use_selection=True,
        export_format="GLB",
        export_materials="NONE",
        export_image_format="NONE",
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
    )
    print("FINISH", name, tris(bust))
    if name == "bust.glb":
        bpy.ops.wm.save_as_mainfile(filepath=PREVIEW, copy=True)  # for looking at it in Blender
