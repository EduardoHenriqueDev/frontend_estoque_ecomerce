import React, { useState } from "react";
import { Upload } from "lucide-react";

const Anuncio: React.FC = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState<number>(0); // Definido como número
    const [numero, setNumero] = useState<number>(0); // Definido como número
    const [estoque, setEstoque] = useState<number>(0); // Definido como número
    const [imagem, setImagem] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState("Nenhum arquivo escolhido");
    const [cor, setCor] = useState(""); // Adicionando o estado para a cor

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImagem(file);
            setPreview(URL.createObjectURL(file));
            setFileName(file.name);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        // Verifique se a imagem não é null
        if (!imagem) {
            alert("Por favor, selecione uma imagem.");
            return;
        }
    
        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("numero", numero.toString());
        formData.append("preco", preco.toString());
        formData.append("estoque", estoque.toString());
        formData.append("cor", cor); // Passando a cor para o FormData
        
        // Passando a imagem se ela não for null
        formData.append("imagem", imagem);
    
        try {
            const response = await fetch("http://localhost:8080/api/tennis", {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                alert("Tênis cadastrado com sucesso!");
            } else {
                alert("Erro ao cadastrar o tênis!");
            }
        } catch (error) {
            console.error("Erro ao fazer requisição", error);
            alert("Erro ao fazer requisição.");
        }
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
                            onChange={(e) => setPreco(Number(e.target.value))}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Número:</label>
                        <input
                            type="number"
                            value={numero}
                            onChange={(e) => setNumero(Number(e.target.value))}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Estoque:</label>
                        <input
                            type="number"
                            value={estoque}
                            onChange={(e) => setEstoque(Number(e.target.value))}
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* Adicionando o campo para selecionar a cor */}
                    <div style={styles.formGroup}>
                        <label>Cor:</label>
                        <input
                            type="text"
                            value={cor}
                            onChange={(e) => setCor(e.target.value)}
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
