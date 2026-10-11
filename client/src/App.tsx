import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Process from "./pages/Process";
import NotFound from "./pages/NotFound";
import ReadTool from "./pages/ReadTool";
import Reflect from "./pages/Reflect";
import CourseOverview from "./pages/CourseOverview";
import CourseLessons from "./pages/CourseLessons";
import LessonPlayer from "./pages/LessonPlayer";
import Certificate from "./pages/Certificate";
import Resources from "./pages/Resources";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/journey" component={Journey} />
      <Route path="/process" component={Process} />
      <Route path="/tool" component={ReadTool} />
      <Route path="/reflect" component={Reflect} />
      <Route path="/course" component={CourseOverview} />
      <Route path="/course/lessons" component={CourseLessons} />
      <Route path="/lessons/:slug" component={LessonPlayer} />
      <Route path="/certificate" component={Certificate} />
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
