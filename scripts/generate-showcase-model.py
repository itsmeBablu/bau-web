#!/usr/bin/env python3
"""Generate and validate the original CC0 courtyard pavilion GLB using Python's standard library."""
import argparse
import hashlib
import json
import struct
from pathlib import Path

OUTPUT = Path(__file__).resolve().parents[1] / 'public/models/courtyard-pavilion.glb'


def generate() -> bytes:
    meshes, nodes, materials = [], [], []
    binary = bytearray()
    views, accessors = [], []

    def material(name: str, color: list[float]) -> int:
        materials.append({'name': name, 'pbrMetallicRoughness': {'baseColorFactor': color, 'metallicFactor': 0.0, 'roughnessFactor': 0.82}})
        return len(materials) - 1

    stone = material('Warm limestone', [0.76, 0.70, 0.57, 1])
    glass = material('Blue glazing', [0.15, 0.48, 0.61, 1])
    accent = material('Golden steel', [0.92, 0.66, 0.12, 1])
    ground = material('Site plane', [0.24, 0.29, 0.30, 1])

    def box(name: str, x: float, y: float, z: float, sx: float, sy: float, sz: float, mat: int) -> None:
        faces = [
            ((-1, 0, 0), [(0, 0, 0), (0, 0, 1), (0, 1, 1), (0, 1, 0)]),
            ((1, 0, 0), [(1, 0, 0), (1, 1, 0), (1, 1, 1), (1, 0, 1)]),
            ((0, -1, 0), [(0, 0, 0), (1, 0, 0), (1, 0, 1), (0, 0, 1)]),
            ((0, 1, 0), [(0, 1, 0), (0, 1, 1), (1, 1, 1), (1, 1, 0)]),
            ((0, 0, -1), [(0, 0, 0), (0, 1, 0), (1, 1, 0), (1, 0, 0)]),
            ((0, 0, 1), [(0, 0, 1), (1, 0, 1), (1, 1, 1), (0, 1, 1)]),
        ]
        positions, normals = [], []
        for normal, corners in faces:
            for index in (0, 1, 2, 0, 2, 3):
                a, b, c = corners[index]
                positions += [x + (a - 0.5) * sx, y + (b - 0.5) * sy, z + (c - 0.5) * sz]
                normals += list(normal)
        while len(binary) % 4:
            binary.append(0)
        offset = len(binary)
        binary.extend(struct.pack(f'<{len(positions)}f', *positions))
        position_view = len(views)
        views.append({'buffer': 0, 'byteOffset': offset, 'byteLength': len(positions) * 4, 'target': 34962})
        offset = len(binary)
        binary.extend(struct.pack(f'<{len(normals)}f', *normals))
        normal_view = len(views)
        views.append({'buffer': 0, 'byteOffset': offset, 'byteLength': len(normals) * 4, 'target': 34962})
        vertices = [positions[i:i + 3] for i in range(0, len(positions), 3)]
        position_accessor = len(accessors)
        accessors.append({'bufferView': position_view, 'componentType': 5126, 'count': len(vertices), 'type': 'VEC3', 'min': [min(v[i] for v in vertices) for i in range(3)], 'max': [max(v[i] for v in vertices) for i in range(3)]})
        normal_accessor = len(accessors)
        accessors.append({'bufferView': normal_view, 'componentType': 5126, 'count': len(normals) // 3, 'type': 'VEC3'})
        meshes.append({'name': name, 'primitives': [{'attributes': {'POSITION': position_accessor, 'NORMAL': normal_accessor}, 'material': mat}]})
        nodes.append({'name': name, 'mesh': len(meshes) - 1})

    # Site, courtyard walls, roof, glass clerestory, screen and golden pergola.
    box('Site base', 0, -0.14, 0, 9, 0.18, 7, ground)
    box('Courtyard floor', 0, 0.03, 0, 5.6, 0.18, 4.6, stone)
    box('West wall', -2.55, 1.4, 0, 0.26, 2.7, 4.6, stone)
    box('East wall', 2.55, 1.4, 0, 0.26, 2.7, 4.6, stone)
    box('North wall', 0, 1.4, -2.18, 5.3, 2.7, 0.26, stone)
    box('South pier west', -1.9, 1.4, 2.18, 1.3, 2.7, 0.26, stone)
    box('South pier east', 1.9, 1.4, 2.18, 1.3, 2.7, 0.26, stone)
    box('Roof plate', 0, 2.88, 0, 5.8, 0.24, 4.9, stone)
    box('North clerestory', 0, 2.43, -2.03, 4.7, 0.42, 0.06, glass)
    box('West clerestory', -2.4, 2.43, 0, 0.06, 0.42, 4.1, glass)
    box('East clerestory', 2.4, 2.43, 0, 0.06, 0.42, 4.1, glass)
    for i, x in enumerate([-2.15, -1.1, 0, 1.1, 2.15]):
        box(f'Pergola beam {i}', x, 3.08, 0, 0.07, 0.12, 4.5, accent)
    for i, z in enumerate([-1.9, 1.9]):
        for j, x in enumerate([-2.35, 2.35]):
            box(f'Column {i}-{j}', x, 1.4, z, 0.16, 2.7, 0.16, accent)
    for i in range(7):
        box(f'Entry screen {i}', -0.82 + i * 0.27, 1.25, 2.05, 0.055, 2.35, 0.07, accent)
    box('Entry threshold', 0, 0.18, 2.22, 2.4, 0.12, 0.3, glass)

    root = {'asset': {'version': '2.0', 'generator': 'SmartBau original parametric demo model'}, 'scene': 0,
            'scenes': [{'nodes': list(range(len(nodes)))}], 'nodes': nodes, 'meshes': meshes, 'materials': materials,
            'buffers': [{'byteLength': len(binary)}], 'bufferViews': views, 'accessors': accessors}
    document = json.dumps(root, separators=(',', ':')).encode()
    document += b' ' * (-len(document) % 4)
    binary.extend(b'\0' * (-len(binary) % 4))
    total = 12 + 8 + len(document) + 8 + len(binary)
    return (struct.pack('<4sII', b'glTF', 2, total) + struct.pack('<I4s', len(document), b'JSON') + document
            + struct.pack('<I4s', len(binary), b'BIN\0') + binary)


def validate(data: bytes) -> None:
    magic, version, total = struct.unpack_from('<4sII', data)
    assert magic == b'glTF' and version == 2 and total == len(data), 'Invalid GLB header or declared size'
    json_length, json_type = struct.unpack_from('<I4s', data, 12)
    assert json_type == b'JSON', 'GLB JSON chunk is missing'
    document = json.loads(data[20:20 + json_length])
    bin_header = 20 + json_length
    bin_length, bin_type = struct.unpack_from('<I4s', data, bin_header)
    assert bin_type == b'BIN\0' and bin_header + 8 + bin_length == len(data), 'Invalid GLB binary chunk'
    assert document['asset']['version'] == '2.0' and document['meshes'] and document['materials'], 'Model content is incomplete'
    assert document['buffers'][0]['byteLength'] <= bin_length, 'Buffer exceeds binary chunk'
    assert len(document['nodes']) >= 20 and len(document['scenes'][0]['nodes']) == len(document['nodes']), 'Expected architectural primitives are missing'


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='validate the committed GLB without rewriting it')
    args = parser.parse_args()
    if args.check:
        data = OUTPUT.read_bytes()
        validate(data)
    else:
        data = generate()
        validate(data)
        OUTPUT.write_bytes(data)
    print(f'{OUTPUT.relative_to(Path(__file__).resolve().parents[1])}: {len(data):,} bytes · sha256 {hashlib.sha256(data).hexdigest()}')
