<script lang="ts">
    import { toast } from "svelte-sonner";
    import { z } from "zod";

    let name = '';
    let email = '';
    let message = '';

    const schema = z.object({
        name: z.string().min(2, "Un nom est requis (minimum 2 caractères)"),
        email: z.string().email("Email invalide"),
        message: z.string().min(40, "Un minimum de 40 caractères est requis").max(255, "Un maximum de 255 caractères est autorisé"),
    });

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        const result = schema.safeParse({ name, email, message });

        if (!result.success) {
            result.error.errors.forEach(err => {
                toast.error(err.message, { duration: 2000 });
            });
            return;
        }

        const payload = {
            name,
            email,
            message,
        };

        const response = await fetch('/api/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            toast.success('Message envoyé avec succès', { duration: 2000 });
            name = '';
            email = '';
            message = '';
        } else {
            toast.error('Une erreur est survenue', { duration: 2000 });
        }
    };
</script>

<form class="space-y-4" on:submit={handleSubmit} method="post">
    <div>
        <label for="name" class="block custom-font mb-3">Nom:</label>
        <input type="text" id="name" bind:value={name} class="border rounded w-full p-1 focus:outline-none focus:ring-2 focus:ring-[#8aa3ff] transition duration-200" required />
    </div>
    <div>
        <label for="email" class="block custom-font mb-3">Email:</label>
        <input type="email" id="email" bind:value={email} class="border rounded w-full p-1 focus:outline-none focus:ring-2 focus:ring-[#8aa3ff] transition duration-200" required />
    </div>
    <div>
        <label for="message" class="block custom-font mb-3">Message:</label>
        <textarea id="message" bind:value={message} class="border rounded w-full p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#8aa3ff] transition duration-200" required></textarea>
    </div>
    <button type="submit" aria-label="Envoie du formulaire" class="bg-[#8aa3ff] hover:bg-[#7290fd] duration-200 active:bg-[#4c63b6] active:duration-0 text-white rounded-md px-4 py-2">Envoyer</button>
</form>

