import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function Demo() {
    const [count, setCount] = useState(0);
	const [name, setName] = useState("unknown");
    
    return (
        <>
			<div className="card">
				<Button
					size="lg"
					className="font-bold px-6"
					onClick={() => setCount((count) => count + 1)}
					aria-label="increment"
				>
					count is {count}
				</Button>
			</div>
			<div className="card">
				<Button 
					variant="destructive" 
					size="lg"
					className="rounded-full px-6"
					onClick={() => {
						fetch("/api/")
							.then((res) => res.json() as Promise<{ name: string }>)
							.then((data) => setName(data.name));
					}}
					aria-label="get name"
				>
					Name from API is: {name}
				</Button>
				<p>
					Edit <code>worker/index.ts</code> to change the name
				</p>
			</div>
			<p className="read-the-docs">Click on the logos to learn more</p>
        </>
    )
}