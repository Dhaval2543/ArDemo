package com.softices.ar.reactnative.android; 

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class ArViewerModule extends ReactContextBaseJavaModule {
   ArViewerModule(ReactApplicationContext reactContext) {
       super(reactContext);
   }

  @Override
  public String getName() {
    return "ArViewerModule";
  }

  @ReactMethod
  public void openViewer(String fileUrl, String title) {
    Intent sceneViewerIntent = new Intent(Intent.ACTION_VIEW);
    String sceneViewerData = "https://arvr.google.com/scene-viewer/1.0?";
    sceneViewerData = sceneViewerData + "file=" + fileUrl;
    sceneViewerData = sceneViewerData + "&title=" + title;
    sceneViewerData = sceneViewerData + "&mode=ar_preferred";
    sceneViewerIntent.setData(Uri.parse(sceneViewerData));
    sceneViewerIntent.setPackage("com.google.android.googlequicksearchbox");
    sceneViewerIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    getCurrentActivity().startActivity(sceneViewerIntent);
  }
}