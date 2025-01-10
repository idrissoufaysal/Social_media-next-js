import prisma from "@/lib/prisma";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    // Vérifiez que l'ID est bien fourni
    if (!params.id) {
        return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: params.id },
        });

        if (!existingUser) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(existingUser), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500 });
    }
};
