import { useLocation } from "react-router-dom";
import { Footer } from "@/pages/ui/footer/footer";

export function PageFooterWrapper() {
  const { pathname } = useLocation();
  const hidePageFooter = 
  pathname.startsWith("/carrinho");
  if (hidePageFooter) return null;
  return <Footer />;
}