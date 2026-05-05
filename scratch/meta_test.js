const qs = new URLSearchParams({
  filter: '{"name":{"i_contains":"title"}}',
  fields: 'retailer_id,id,name,category,errors',
  access_token: 'EAAjFKQtCeUsBReuSK2UZALG4SyjGrPiF1kKq9RxViArziEUHcea7ULfApnzy6EkWQIPv5bf0VomzpmgcepzbsqbeNpqsqtZAKdNkjilcgLRrZCFvIE7mAmC8kgIVeWxGJY0KPqe6z3yZBbEZCC2FpImJDXcTNxJNo47ouqxmKPf5ZCESJIZCjy26FsZA1OXfngZDZD'
});

fetch('https://graph.facebook.com/v25.0/1489613129370822/products?' + qs)
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d, null, 2)))
  .catch(console.error);
