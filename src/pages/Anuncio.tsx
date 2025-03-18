import React, { useState } from "react";
import { Upload } from "lucide-react";

const Anuncio: React.FC = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState("Nenhum arquivo escolhido");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImagem(file);
            setPreview(URL.createObjectURL(file));
            setFileName(file.name);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log({ nome, descricao, preco, imagem });
        // Aqui você pode enviar os dados para o backend
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Criar Anúncio</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Descrição:</label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            style={styles.textarea}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Preço:</label>
                        <input
                            type="number"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Foto do Produto:</label>
                        <div style={styles.uploadContainer}>
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleImageChange}
                                style={styles.hiddenInput}
                            />
                            <label htmlFor="fileInput" style={styles.uploadButton}>
                                <Upload size={20} color="#fff" />
                            </label>
                            <span>{fileName}</span>
                        </div>
                        {preview && <img src={preview} alt="Prévia" style={styles.previewImage} />}
                    </div>

                    <button type="submit" style={styles.button}>Publicar Anúncio</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
    },
    card: {
        width: "400px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0px 1px 14px 5px rgba(0, 0, 0, 0.1)",
        textAlign: "center" as "center",
    },
    title: {
        marginBottom: "20px",
        fontSize: "22px",
        fontWeight: "bold",
    },
    formGroup: {
        marginBottom: "15px",
        textAlign: "left" as "left",
    },
    input: {
        width: "100%",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    textarea: {
        width: "100%",
        height: "80px",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        resize: "none" as "none",
    },
    uploadContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    hiddenInput: {
        display: "none",
    },
    uploadButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "50px",
        cursor: "pointer",
        fontSize: "14px",
    },
    previewImage: {
        marginTop: "10px",
        width: "100px",
        height: "100px",
        objectFit: "cover" as "cover",
        borderRadius: "5px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "50px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background 0.3s",
    },
};

export default Anuncio;
