package com.assignment4.utils;

public class NetworkConfig {
    // Change this to your computer's IP address when using tethering
    // For Android Emulator, use: "10.0.2.2"
    // For physical device, use your computer's IP (e.g., "192.168.1.100")
    // private static final String BASE_URL = "http://10.0.2.2:3000/api";

    // For physical device - Using your computer's IP
    private static final String BASE_URL = "http://172.20.10.5:3000/api";

    public static String getBaseUrl() {
        return BASE_URL;
    }

    public static String getCategoriesUrl() {
        return BASE_URL + "/categories";
    }

    public static String getProductsUrl() {
        return BASE_URL + "/products";
    }

    public static String getProductUrl(int id) {
        return BASE_URL + "/products/" + id;
    }
}
