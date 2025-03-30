export async function createPost(formData: FormData) {
    const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
    });

    return response.json();
}

export async function updatePost(formData: FormData) {
    const response = await fetch("/api/posts", {
        method: "PUT",
        body: formData,
    });

    return response.json();
}

export async function deletePost(id: string) {
    const response = await fetch(`/api/posts/${ id }`, {
        method: "DELETE",
    });

    return response.json();
}