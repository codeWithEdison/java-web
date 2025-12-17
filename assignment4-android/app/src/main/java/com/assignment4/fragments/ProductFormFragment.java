package com.assignment4.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.assignment4.R;
import com.assignment4.models.Category;
import com.assignment4.models.Product;
import com.assignment4.utils.NetworkConfig;
import com.assignment4.utils.VolleySingleton;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.List;

public class ProductFormFragment extends Fragment {
    private EditText editTextName;
    private EditText editTextPrice;
    private EditText editTextDescription;
    private Spinner spinnerCategory;
    private Button buttonSubmit;
    private List<Category> categories;
    private OnProductCreatedListener listener;

    public interface OnProductCreatedListener {
        void onProductCreated();
    }

    public void setProductCreatedListener(OnProductCreatedListener listener) {
        this.listener = listener;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_product_form, container, false);

        editTextName = view.findViewById(R.id.editTextName);
        editTextPrice = view.findViewById(R.id.editTextPrice);
        editTextDescription = view.findViewById(R.id.editTextDescription);
        spinnerCategory = view.findViewById(R.id.spinnerCategory);
        buttonSubmit = view.findViewById(R.id.buttonSubmit);

        categories = new ArrayList<>();
        loadCategories();

        buttonSubmit.setOnClickListener(v -> submitProduct());

        return view;
    }

    private void loadCategories() {
        String url = NetworkConfig.getCategoriesUrl();

        JsonObjectRequest request = new JsonObjectRequest(
                Request.Method.GET,
                url,
                null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            List<Category> categoryList = new ArrayList<>();
                            
                            // Handle API response: { success: true, data: [...] }
                            if (response.has("success") && response.getBoolean("success")) {
                                if (response.has("data") && response.get("data") instanceof JSONArray) {
                                    JSONArray dataArray = response.getJSONArray("data");
                                    for (int j = 0; j < dataArray.length(); j++) {
                                        JSONObject catObj = dataArray.getJSONObject(j);
                                        Category category = Category.fromJson(catObj);
                                        categoryList.add(category);
                                    }
                                }
                            }
                            
                            categories.clear();
                            categories.addAll(categoryList);
                            
                            ArrayAdapter<Category> adapter = new ArrayAdapter<>(
                                    requireContext(),
                                    android.R.layout.simple_spinner_item,
                                    categories
                            );
                            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                            spinnerCategory.setAdapter(adapter);
                        } catch (JSONException e) {
                            e.printStackTrace();
                            Toast.makeText(requireContext(), 
                                    "Error loading categories: " + e.getMessage(), 
                                    Toast.LENGTH_LONG).show();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        String errorMessage = "Failed to load categories";
                        if (error.getMessage() != null) {
                            errorMessage = error.getMessage();
                        }
                        Toast.makeText(requireContext(), errorMessage, Toast.LENGTH_LONG).show();
                    }
                }
        );

        VolleySingleton.getInstance(requireContext()).getRequestQueue().add(request);
    }

    private void submitProduct() {
        String name = editTextName.getText().toString().trim();
        String priceStr = editTextPrice.getText().toString().trim();
        String description = editTextDescription.getText().toString().trim();

        if (name.isEmpty()) {
            editTextName.setError(getString(R.string.required_field));
            return;
        }

        if (priceStr.isEmpty()) {
            editTextPrice.setError(getString(R.string.required_field));
            return;
        }

        double price;
        try {
            price = Double.parseDouble(priceStr);
            if (price < 0) {
                editTextPrice.setError(getString(R.string.invalid_price));
                return;
            }
        } catch (NumberFormatException e) {
            editTextPrice.setError(getString(R.string.invalid_price));
            return;
        }

        if (spinnerCategory.getSelectedItem() == null) {
            Toast.makeText(requireContext(), getString(R.string.select_category), Toast.LENGTH_SHORT).show();
            return;
        }

        Category selectedCategory = (Category) spinnerCategory.getSelectedItem();
        int categoryId = selectedCategory.getId();

        try {
            JSONObject productJson = new JSONObject();
            productJson.put("name", name);
            productJson.put("price", price);
            productJson.put("category_id", categoryId);
            if (!description.isEmpty()) {
                productJson.put("description", description);
            }

            String url = NetworkConfig.getProductsUrl();

            JsonObjectRequest request = new JsonObjectRequest(
                    Request.Method.POST,
                    url,
                    productJson,
                    new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            try {
                                if (response.has("success") && response.getBoolean("success")) {
                                    Toast.makeText(requireContext(), 
                                            getString(R.string.success_product_created), 
                                            Toast.LENGTH_SHORT).show();
                                    
                                    // Clear form
                                    editTextName.setText("");
                                    editTextPrice.setText("");
                                    editTextDescription.setText("");
                                    
                                    // Notify listener to refresh list
                                    if (listener != null) {
                                        listener.onProductCreated();
                                    }
                                } else {
                                    String message = "Failed to create product";
                                    if (response.has("message")) {
                                        message = response.getString("message");
                                    }
                                    Toast.makeText(requireContext(), message, Toast.LENGTH_LONG).show();
                                }
                            } catch (JSONException e) {
                                e.printStackTrace();
                                Toast.makeText(requireContext(), 
                                        "Error: " + e.getMessage(), 
                                        Toast.LENGTH_LONG).show();
                            }
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            String errorMessage = getString(R.string.error_network);
                            if (error.networkResponse != null) {
                                errorMessage = "Error: " + error.networkResponse.statusCode;
                            } else if (error.getMessage() != null) {
                                errorMessage = error.getMessage();
                            }
                            Toast.makeText(requireContext(), errorMessage, Toast.LENGTH_LONG).show();
                        }
                    }
            );

            VolleySingleton.getInstance(requireContext()).getRequestQueue().add(request);
        } catch (JSONException e) {
            e.printStackTrace();
            Toast.makeText(requireContext(), "Error creating request: " + e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }
}

