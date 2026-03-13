#!/usr/bin/env python3
"""Restructure Module 2 sections into paginated block wrappers."""

import shutil

filepath = 'src/data/moduleStructures.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# ===== Find Module 2 sections boundaries =====
m2_pos = content.find("headerImage: module2Water,")
assert m2_pos >= 0, "Module 2 header not found"

replace_start = content.find("sections: [", m2_pos)
assert replace_start >= 0, "sections: [ not found"

bracket_pos = content.find("[", replace_start)
sections_inner_start = bracket_pos + 1

end_pattern = "\n    ]\n  },\n  {\n    id: 3,"
end_pos = content.find(end_pattern, sections_inner_start)
assert end_pos >= 0, "End pattern not found"

replace_end = end_pos + len("\n    ]")

sections_text = content[sections_inner_start:end_pos]

# ===== Parse individual content blocks =====
blocks = []
i = 0
while i < len(sections_text):
    next_open = sections_text.find('{', i)
    if next_open == -1:
        break
    
    depth = 0
    j = next_open
    in_string = False
    string_char = None
    
    while j < len(sections_text):
        ch = sections_text[j]
        
        if in_string:
            if ch == '\\':
                j += 2
                continue
            if ch == string_char:
                in_string = False
        else:
            if ch in ('"', "'", '`'):
                in_string = True
                string_char = ch
            elif ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    blocks.append(sections_text[next_open:j + 1])
                    i = j + 1
                    break
        j += 1
    else:
        break

print(f"Extracted {len(blocks)} content blocks\n")

for idx, b in enumerate(blocks):
    btype = "unknown"
    for prefix in ["type: '", 'type: "']:
        t_pos = b.find(prefix)
        if t_pos >= 0:
            qc = prefix[-1]
            t_end = b.find(qc, t_pos + len(prefix))
            btype = b[t_pos + len(prefix):t_end]
            break
    
    first_line = b.split('\n')[0]
    indent_count = len(first_line) - len(first_line.lstrip())
    print(f"  {idx:2d}: [{btype:25s}] indent={indent_count}")

if len(blocks) != 56:
    print(f"\nWARNING: Expected 56 blocks, got {len(blocks)}")
    print("Aborting to avoid data loss.")
    exit(1)

# ===== Re-indent helper =====
def reindent(block_text, target_indent=10):
    lines = block_text.split('\n')
    if not lines:
        return block_text
    
    # The first line is '{' (extracted starting from { with no leading whitespace)
    # Find the indentation of the first property line (e.g., "type: ...")
    prop_indent = 0
    for line in lines[1:]:
        stripped = line.strip()
        if stripped:
            prop_indent = len(line) - len(stripped)
            break
    
    # Target: { at target_indent, properties at target_indent + 2
    target_prop_indent = target_indent + 2
    
    result = []
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            result.append('')
            continue
        
        if i == 0:
            # Opening {
            result.append(' ' * target_indent + stripped)
        else:
            current = len(line) - len(stripped)
            relative_to_prop = current - prop_indent
            new_indent = target_prop_indent + relative_to_prop
            result.append(' ' * max(0, new_indent) + stripped)
    
    return '\n'.join(result)

# ===== Define page structure =====
# Each tuple: (colorTheme, list of block indices)
pages = [
    ('teal',   [0, 1, 2]),                                          # Page 1: Introduction
    ('blue',   [3, 4]),                                              # Page 2: Core System Elements
    ('green',  [5, 6, 7, 8, 9, 10, 11, 12, 13]),                    # Page 3: Draw Exercise
    ('amber',  [14, 15, 16, 17]),                                    # Page 4: Climate Connection
    ('purple', [18, 19, 20, 21, 22, 23]),                            # Page 5: First Simulation
    ('pink',   [24, 25, 26, 27, 28, 29, 30]),                       # Page 6: CO2 Removals
    ('teal',   [31, 32, 33, 34, 35, 36]),                            # Page 7: Second Simulation
    ('blue',   [37, 38, 39, 40]),                                    # Page 8: Bathtub Analogy
    ('green',  [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]),       # Page 9: Net-Zero Vision
    ('amber',  [52, 53, 54]),                                        # Page 10: Hope Meditation
    ('purple', [55]),                                                 # Page 11: Feedback
]

# Verify all blocks are accounted for
all_indices = []
for _, indices in pages:
    all_indices.extend(indices)
assert sorted(all_indices) == list(range(len(blocks))), \
    f"Block coverage mismatch: got {sorted(all_indices)}, expected 0-{len(blocks)-1}"

# ===== Build new sections content =====
parts = ["sections: ["]

for page_idx, (color, block_indices) in enumerate(pages):
    parts.append("      {")
    parts.append("        type: 'block',")
    parts.append(f"        colorTheme: '{color}',")
    parts.append("        content: [")
    
    for bi in block_indices:
        reindented = reindent(blocks[bi], target_indent=10)
        parts.append(reindented + ",")
    
    parts.append("        ]")
    if page_idx < len(pages) - 1:
        parts.append("      },")
    else:
        parts.append("      }")

parts.append("")
parts.append("    ]")

new_sections = '\n'.join(parts)

# ===== Backup and replace =====
shutil.copy2(filepath, filepath + '.bak')
print(f"\nBackup saved to {filepath}.bak")

new_content = content[:replace_start] + new_sections + content[replace_end:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\nSuccessfully restructured Module 2 into {len(pages)} paginated blocks!")
print("Pages:")
page_names = [
    "Introduction", "Core System Elements", "Draw Exercise",
    "Climate Connection", "First Simulation", "CO2 Removals",
    "Second Simulation", "Bathtub Analogy", "Net-Zero Vision",
    "Hope Meditation", "Feedback"
]
for idx, ((color, indices), name) in enumerate(zip(pages, page_names)):
    print(f"  Page {idx+1}: {name} ({color}) - {len(indices)} blocks")
