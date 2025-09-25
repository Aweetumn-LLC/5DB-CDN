import React from "react";

const AuthSimple = () => {
  console.log("AuthSimple component rendered");
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6">
        <div className="bg-card rounded-lg border p-6">
          <h1 className="text-2xl font-bold text-center mb-4">Authentication Test</h1>
          <p className="text-center text-muted-foreground">
            This is a simple test page to verify routing works.
          </p>
          <div className="mt-4">
            <button 
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded"
              onClick={() => console.log("Button clicked")}
            >
              Test Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSimple;