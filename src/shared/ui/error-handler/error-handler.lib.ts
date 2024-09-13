const isDevelopment = process.env.MODE === "dev";

export const logError = (
  error: Error,
  info: { componentStack?: string | null }
) => {
  if (!isDevelopment) {
    // Log error to an external service in production
  } else {
    console.log("Caught error:", error);
    console.log("Error details:", info);
  }
};