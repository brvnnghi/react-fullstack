export default function UrlForm() {

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <form className="form grid gap-6">
        <div className="grid gap-2">
            <label htmlFor="url">Url</label>
            <input type="url" id="url" />
            <p className="text-muted-foreground text-sm">This is your public display name.</p>
        </div>
        <div className="grid gap-2">
            <label htmlFor="lastmod">Last Modified</label>
            <input type="date" id="lastmod" />
        </div>
        <button type="submit">
            Add
        </button>
      </form>
    </div>
  );
}