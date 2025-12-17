package com.assignment4;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            setContentView(R.layout.activity_main);

            Button openNetworkButton = findViewById(R.id.btnOpenNetwork);
            if (openNetworkButton != null) {
                openNetworkButton.setOnClickListener(v -> {
                    Intent intent = new Intent(MainActivity.this, NetworkActivity.class);
                    startActivity(intent);
                });
            } else {
                Toast.makeText(this, "Button not found", Toast.LENGTH_SHORT).show();
            }
        } catch (Exception e) {
            Toast.makeText(this, "Error: " + e.getMessage(), Toast.LENGTH_LONG).show();
            e.printStackTrace();
        }
    }
}

