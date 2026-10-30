# The Bust: image-to-3D (Rodin first), finished by a Blender script

The Bust is generated from four photos of the owner with an image-to-3D service, then cut, cleaned, given a neutral material and compressed by `scripts/bust/finish.py` in Blender. The marble look is set in React Three Fiber.

Expected quality, said plainly to the owner: head shape and proportions right, nose, eyes and mouth softened ("looks like a relative"). Marble hides most of that, since Greek busts are smooth anyway.

## Considered Options

- **Rodin Gen-2.5**: chosen first. Best reputation for characters, free tier gives private assets. Its data terms must be checked before any upload.
- **Tripo / Meshy free tiers**: rejected. Uploads are used for training and Tripo's free models are public. Not acceptable for the owner's face.
- **Hunyuan3D locally**: rejected. Needs 16–24 GB RAM; the owner's Mac is an M1 with 8 GB.
- **KeenTools FaceBuilder**: fallback. Best likeness (fits 5–10 real photos), but paid and head-only, so hair, neck and shoulders are sculpted by hand.
- **Sculpting from scratch**: rejected. Days of work for a likeness the tools above get in hours.

## Consequences

- Fine facial detail is a manual Sculpt Mode job (1–3 hours) if the owner wants it; the script does not do it.
- Two files ship: `bust.glb` (≤ 3 MB) and `bust-lite.glb` (≤ 1 MB) for phones.
