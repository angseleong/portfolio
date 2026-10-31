# The Bust: the scan's head on a template body, as a polished metal mosaic

Supersedes the material and "cut below the shoulders" parts of ADR-0006; the Rodin scan and the Blender script stay.

The scan came out with the owner's shirt and a hunched neck. Only its head is kept. The neck, shoulders, chest and plinth come from Poly Haven's Marble Bust 01 (CC0, Rico Cilliers), with the head turned 35° the way that neck was carved. Head and body are fused by a coarse voxel remesh and decimated into ~6k flat facets, shown in polished metal (`metalness` 1, `roughness` ~0.18, `flatShading`). The owner chose the mosaic and the metal on 31 Oct.

## Considered Options

- **Smooth marble or smooth metal on the full scan**: rejected. The joint between the scan's jaw and any neck stayed visible ("broken neck"), and smoothing or finely remeshing the scan ruined the eyes and the hair (the hair is made of thin sheets).
- **A body built in the script from rings**: rejected by the owner, it looked like a bottle.
- **Muscular paid models (CGTrader)**: not needed; the CC0 bust has the classical neck, collarbones and chest.
- **Mosaic**: chosen. The coarse remesh fuses head and body into one surface, so the joint disappears, and the facets read as a deliberate style rather than scan noise.

## Consequences

- Fine facial detail is gone by design; the likeness is in the proportions, nose, jaw and hair shape.
- Files are tiny (~100 KB and ~50 KB with Draco), far under the 3 MB / 1 MB budgets.
- The scene needs a lit environment (drei `Lightformer`s), since metal only shows what it reflects.
