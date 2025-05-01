
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Check if we're running as a mobile app
const isMobileApp = () => {
  return window.location.href.includes('capacitor://') || 
         window.location.href.includes('localhost') ||
         document.URL.startsWith('file:');
};

const App = () => {
  useEffect(() => {
    // Prevent screen from sleeping when game is open on mobile
    if (isMobileApp()) {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          try {
            // This is just a type declaration, the actual implementation will be 
            // available via Capacitor on mobile
            const screenReader = (window as any).Capacitor?.Plugins?.ScreenReader;
            if (screenReader?.keepScreenOn) {
              screenReader.keepScreenOn({ isEnabled: true });
            }
          } catch (error) {
            console.log('Screen wake lock not supported on this device');
          }
        }
      });
    }

    return () => {
      if (isMobileApp()) {
        document.removeEventListener('visibilitychange', () => {});
        try {
          const screenReader = (window as any).Capacitor?.Plugins?.ScreenReader;
          if (screenReader?.keepScreenOn) {
            screenReader.keepScreenOn({ isEnabled: false });
          }
        } catch (error) {
          console.log('Error releasing screen wake lock');
        }
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
