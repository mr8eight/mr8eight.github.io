import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

const AuthenticatedApp = React.lazy(() => import("authenticated-app")); //代码分割优化性能
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app")); 

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}> 
      {/* 代码分割优化性能 */}
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
