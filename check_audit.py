import json
d = json.load(open('live_store_audit_results.json'))
print('Total:', d['total'])
print('OK:', d['ok_count'])
print('Missing image only:', len(d['missing_image']))
print('Missing desc only:', len(d['missing_desc']))
print('Missing both:', len(d['missing_both']))
print()

# Check missing image ones
print('=== Missing image only ===')
for p in d['missing_image']:
    print(f"  {p['id']}: {p['title']}")

print()
print('=== Missing description only ===')
for p in d['missing_desc']:
    print(f"  {p['id']}: {p['title']}")
    
print()
print('=== Sample of missing_both titles ===')
for p in d['missing_both'][:5]:
    print(f"  {p['id']}: {p['title']}")
print(f"  ... and {len(d['missing_both'])-5} more")
