import { logout } from "@/data/credential";
import type { useRouter } from "next/navigation";

type Router = ReturnType<typeof useRouter>;

type Credential = {
  token: string;
  email: string;
  name: string;
  role: string;
};

export const checkLogin = (router: Router, returnPath: string) => {
  const credentialString = localStorage.getItem("credential");

  if (credentialString) {
    try {
      const credential: Credential = JSON.parse(credentialString);

      if (
        credential.token &&
        credential.email &&
        credential.name &&
        credential.role
      ) {
        // Login แล้ว ไม่ต้อง Redirect
        return;
      }
    } catch {
      // Credential ไม่ถูกต้อง
    }
  }

  // ยังไม่ได้ Login
  localStorage.removeItem("credential");
  localStorage.setItem("returnPath", returnPath);
  router.replace("/login");
};

export const doLogout = (router: Router, returnPath: string) => {
  const credentialString = localStorage.getItem("credential");

  if (credentialString !== null) {
    const { token }: Credential = JSON.parse(credentialString);

    logout(token)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem("credential");
        router.replace(returnPath);
        router.refresh();
      });
  } else {
    router.replace(returnPath);
    router.refresh();
  }
};
