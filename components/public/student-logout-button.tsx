import { logoutStudent } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui/button";

export function StudentLogoutButton() {
  return (
    <form action={logoutStudent}>
      <Button type="submit" variant="outline" size="sm">
        Sign out
      </Button>
    </form>
  );
}
