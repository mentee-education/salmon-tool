import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Research from "./pages/Research";
import NotFound from "./pages/NotFound";
import ReadTool from "./pages/ReadTool";
import Reflect from "./pages/Reflect";
import Resources from "./pages/Resources";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/journey" component={Journey} />
      <Route path="/research" component={Research} />
      <Route path="/process" component={Research} />
      {/* the course was retired; old links land on the research */}
      <Route path="/course" component={Research} />
      <Route path="/course/lessons" component={Research} />
      <Route path="/lessons/:slug" component={Research} />
      <Route path="/certificate" component={Research} />
      <Route path="/tool" component={ReadTool} />
      <Route path="/reflect" component={Reflect} />
      <Route path="/resources" component={Resources} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
