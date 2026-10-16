import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import OnePage from "./pages/OnePage";
import NotFound from "./pages/NotFound";
import ReadTool from "./pages/ReadTool";

/* Old pages now live as sections of the one-page site; their addresses land on the matching section. */
function ToSection({ id }: { id: string }) {
  const [, navigate] = useLocation();
  useEffect(() => { navigate(`/#${id}`, { replace: true }); setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60); }, [id, navigate]);
  return <OnePage />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={OnePage} />
      <Route path="/tool" component={ReadTool} />
      <Route path="/research">{() => <ToSection id="process" />}</Route>
      <Route path="/process">{() => <ToSection id="process" />}</Route>
      <Route path="/journey">{() => <ToSection id="cycle" />}</Route>
      <Route path="/reflect">{() => <ToSection id="questions" />}</Route>
      <Route path="/resources">{() => <ToSection id="learn" />}</Route>
      <Route path="/course">{() => <ToSection id="process" />}</Route>
      <Route path="/course/lessons">{() => <ToSection id="process" />}</Route>
      <Route path="/lessons/:slug">{() => <ToSection id="process" />}</Route>
      <Route path="/certificate">{() => <ToSection id="process" />}</Route>
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
