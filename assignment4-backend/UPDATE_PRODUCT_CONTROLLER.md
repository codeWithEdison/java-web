# Update Product Controller for Image Support

The product controller needs manual updates in 3 locations where ProductWithCategory objects are created.

## Changes Needed:

In `src/controllers/productController.ts`, add `image_url: row.image_url,` to all ProductWithCategory mappings:

### Location 1: getAllProducts (around line 22)
```typescript
const product: ProductWithCategory = {
  id: row.id,
  name: row.name,
  price: parseFloat(row.price),
  description: row.description,
  image_url: row.image_url,  // ADD THIS LINE
  category_id: row.category_id,
  created_at: row.created_at,
  category: ...
};
```

### Location 2: getProductById (around line 77)
```typescript
const product: ProductWithCategory = {
  id: row.id,
  name: row.name,
  price: parseFloat(row.price),
  description: row.description,
  image_url: row.image_url,  // ADD THIS LINE
  category_id: row.category_id,
  created_at: row.created_at,
  category: ...
};
```

### Location 3: createProduct (around line 157)
```typescript
const product: ProductWithCategory = {
  id: row.id,
  name: row.name,
  price: parseFloat(row.price),
  description: row.description,
  image_url: row.image_url,  // ADD THIS LINE
  category_id: row.category_id,
  created_at: row.created_at,
  category: ...
};
```

### Location 4: updateProduct (around line 247)
```typescript
const product: ProductWithCategory = {
  id: row.id,
  name: row.name,
  price: parseFloat(row.price),
  description: row.description,
  image_url: row.image_url,  // ADD THIS LINE
  category_id: row.category_id,
  created_at: row.created_at,
  category: ...
};
```

Already updated:
- ✅ Types in `src/types/index.ts`
- ✅ Create and Update request handlers  
- ✅ Database schema in `seedDatabase.ts`

