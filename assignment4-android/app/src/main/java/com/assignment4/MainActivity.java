package com.assignment4;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.button.MaterialButton;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        MaterialButton openNetworkButton = findViewById(R.id.btnOpenNetwork);
        openNetworkButton.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, NetworkActivity.class);
            startActivity(intent);
        });
    }
}

