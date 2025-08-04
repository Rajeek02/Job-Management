// src/hooks/use-toast.js
export function useToast() {
  const showToast = (msg) => alert(msg);
  return { showToast };
}
