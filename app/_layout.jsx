import TaskItem from "@/components/TaskItem";
import { Stack} from "expo-router";

export default function RootLayout() {
  return <Stack><Stack.Screen 
  name="index" 
  options={{ headerShown: false }} // This hides the header
/>

  </Stack>
}
  