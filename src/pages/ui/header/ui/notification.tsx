import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function Notification() {
    return (
        <Button variant="outline" size="icon">
          <Bell/>
          <span className="sr-only">Notificações</span>
        </Button>
    )
}