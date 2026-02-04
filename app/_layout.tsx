import { Stack } from "expo-router";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
  return (
    
    <GluestackUIProvider mode="dark">
      <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.63, 0.9],
          sheetGrabberVisible: true,
          //headerShown: false,
        }}
      />
    </Stack>
    </GluestackUIProvider>
  
  );
}
