import { useState } from "react";

import { Button } from "@/react-app/components/ui/button";

export default function Demo() {
    const [count, setCount] = useState(0);
	const [name, setName] = useState("unknown");
    
    return (
        <>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-white p-5">
					<h2 className="text-lg font-semibold mb-3">Demo React SPA</h2>
					<Button
						size="lg"
						className="font-bold px-6 cursor-pointer"
						onClick={() => setCount((count) => count + 1)}
						aria-label="increment"
					>
						count is {count}
					</Button>
				</div>
				<div className="aspect-video rounded-xl bg-white p-5">
					<h2 className="text-lg font-semibold mb-3">Demo Hono API</h2>
					<Button 
						variant="destructive" 
						size="lg"
						className="font-bold px-6 cursor-pointer"
						onClick={() => {
							fetch("/api/")
								.then((res) => res.json() as Promise<{ name: string }>)
								.then((data) => setName(data.name));
						}}
						aria-label="get name"
					>
						Name from API is: {name}
					</Button>
				</div>
				<div className="aspect-video rounded-xl bg-white" />
			</div>
        </>
    )
}