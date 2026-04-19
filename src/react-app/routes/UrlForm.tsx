import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UrlForm() {

  return (
    <form className="grid gap-6">
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
        <Input type="date" id="lastmod" name="lastmod" />
      </div>

      <Button type="submit" className="w-full">
        Add
      </Button>
    </form>
  );
}