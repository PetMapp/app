package io.ionic.starter;
import android.os.Bundle;
import android.webkit.WebSettings; // Importação para WebSettings
import android.webkit.WebView; // Importação para WebView
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Habilita o uso do sessionStorage no WebView
        WebView webView = new WebView(this);
        webView.getSettings().setDomStorageEnabled(true); // Ativa o DOM storage (localStorage e sessionStorage)
        webView.getSettings().setJavaScriptEnabled(true); // Certifica-se de que o JavaScript está habilitado
        webView.getSettings().setDatabaseEnabled(true); // Habilita banco de dados de armazenamento

        webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);

    }
}
