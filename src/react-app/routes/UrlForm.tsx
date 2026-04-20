import { Form, redirect } from "react-router-dom";

import { Input } from "@/react-app/components/ui/input";
import { Label } from "@/react-app/components/ui/label";
import { Button } from "@/react-app/components/ui/button";

import type { CreateUrlItemType } from "@/shared/types";

export default function UrlForm() {

  return (
    <Form method="post" className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="url">URL</Label>
        <Input
          type="url"
          id="url"
          name="url"
          placeholder="https://example.com"
          required
        />
        <p className="text-muted-foreground text-sm">
          Địa chỉ trang web bạn muốn thêm.
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="lastmod">Last Modified</Label>
        <Input 
          type="date"
          id="lastmod"
          name="lastmod" 
        />
      </div>

      <Button type="submit" className="w-full">
        Add
      </Button>
    </Form>
  );
}

// action is exported here because UrlForm owns the <Form>.
// It's wired to the /list/new route in main.tsx.
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData) as CreateUrlItemType;

  await fetch("/api/urls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  // After a successful action, redirecting to /list
  // causes the UrlList loader to re-run automatically
  return redirect("/list");
}