package com.assignment4;

import android.os.Bundle;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.assignment4.adapters.ProductAdapter;
import com.assignment4.fragments.ProductFormFragment;
import com.assignment4.models.Product;
import com.assignment4.utils.NetworkConfig;
import com.assignment4.utils.VolleySingleton;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.List;

public class NetworkActivity extends AppCompatActivity implements ProductFormFragment.OnProductCreatedListener {
    private RecyclerView recyclerView;
    private ProductAdapter adapter;
    private List<Product> productList;
    private MaterialButton btnToggleForm;
    private FloatingActionButton fabAddProduct;
    private ProductFormFragment formFragment;
    private boolean isFormVisible = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            setContentView(R.layout.activity_network);

            recyclerView = findViewById(R.id.recyclerViewProducts);
            btnToggleForm = findViewById(R.id.btnToggleForm);
            fabAddProduct = findViewById(R.id.fabAddProduct);

            if (recyclerView == null || btnToggleForm == null || fabAddProduct == null) {
                Toast.makeText(this, "Layout error: Views not found", Toast.LENGTH_LONG).show();
                finish();
                return;
            }

            // Ensure RecyclerView is visible initially
            recyclerView.setVisibility(View.VISIBLE);
            
            productList = new ArrayList<>();
            adapter = new ProductAdapter(productList, this::showProductDetails);
            recyclerView.setLayoutManager(new LinearLayoutManager(this));
            recyclerView.setAdapter(adapter);

            btnToggleForm.setOnClickListener(v -> toggleFormFragment());
            fabAddProduct.setOnClickListener(v -> toggleFormFragment());

            FragmentManager fragmentManager = getSupportFragmentManager();
            formFragment = (ProductFormFragment) fragmentManager.findFragmentById(R.id.fragmentContainer);

            if (formFragment == null) {
                formFragment = new ProductFormFragment();
                formFragment.setProductCreatedListener(this);
            }

            // Load products - don't crash if network fails
            try {
                loadProducts();
            } catch (Exception e) {
                Toast.makeText(this, "Error loading products: " + e.getMessage(), Toast.LENGTH_LONG).show();
                e.printStackTrace();
            }
        } catch (Exception e) {
            Toast.makeText(this, "Error initializing: " + e.getMessage(), Toast.LENGTH_LONG).show();
            e.printStackTrace();
            finish();
        }
    }

    private void toggleFormFragment() {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FrameLayout fragmentContainer = findViewById(R.id.fragmentContainer);
        
        if (!isFormVisible) {
            // Show form - hide RecyclerView
            recyclerView.setVisibility(View.GONE);
            fragmentContainer.setVisibility(View.VISIBLE);
            
            fragmentManager.beginTransaction()
                    .replace(R.id.fragmentContainer, formFragment)
                    .commit();
            isFormVisible = true;
            btnToggleForm.setText(getString(R.string.cancel));
            fabAddProduct.hide();
        } else {
            // Hide form - show RecyclerView
            fragmentContainer.setVisibility(View.GONE);
            recyclerView.setVisibility(View.VISIBLE);
            
            fragmentManager.beginTransaction()
                    .remove(formFragment)
                    .commit();
            isFormVisible = false;
            btnToggleForm.setText(getString(R.string.add_product));
            fabAddProduct.show();
        }
    }

    private void loadProducts() {
        String url = NetworkConfig.getProductsUrl();

        JsonObjectRequest request = new JsonObjectRequest(
                Request.Method.GET,
                url,
                null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        loadProductsFromObjectResponse(response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        String errorMessage = "Network error";
                        if (error.networkResponse != null) {
                            errorMessage = "Error: " + error.networkResponse.statusCode;
                        } else if (error.getMessage() != null) {
                            errorMessage = error.getMessage();
                        }
                        Toast.makeText(NetworkActivity.this, errorMessage, Toast.LENGTH_LONG).show();
                    }
                }
        );

        VolleySingleton.getInstance(this).getRequestQueue().add(request);
    }

    private void loadProductsFromObjectResponse(JSONObject response) {
        try {
            List<Product> products = new ArrayList<>();
            
            if (response.has("success") && response.getBoolean("success")) {
                if (response.has("data")) {
                    Object data = response.get("data");
                    if (data instanceof JSONArray) {
                        JSONArray dataArray = (JSONArray) data;
                        for (int i = 0; i < dataArray.length(); i++) {
                            JSONObject productObj = dataArray.getJSONObject(i);
                            // Product.fromJson can handle direct JSON object
                            Product product = Product.fromJson(productObj);
                            products.add(product);
                        }
                    }
                }
            }
            
            productList.clear();
            productList.addAll(products);
            adapter.updateProducts(productList);
        } catch (JSONException e) {
            e.printStackTrace();
            Toast.makeText(this, "Error parsing response: " + e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

    private void showProductDetails(Product product) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(getString(R.string.product_details));
        
        String details = "Name: " + product.getName() + "\n\n" +
                "Price: $" + String.format("%.2f", product.getPrice()) + "\n\n" +
                "Category: " + (product.getCategory() != null ? product.getCategory().getName() : "N/A") + "\n\n";
        
        if (product.getDescription() != null && !product.getDescription().isEmpty()) {
            details += "Description: " + product.getDescription() + "\n\n";
        }
        
        if (product.getCreatedAt() != null) {
            details += "Created: " + product.getCreatedAt();
        }
        
        builder.setMessage(details);
        builder.setPositiveButton(getString(R.string.close), null);
        builder.show();
    }

    @Override
    public void onProductCreated() {
        loadProducts();
        if (isFormVisible) {
            toggleFormFragment();
        }
    }
}

