import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

const Anuncio: React.FC = () => {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState<number>(0);
    const [numero, setNumero] = useState<number>(0);
    const [marca, setMarca] = useState("");
    const [imagem, setImagem] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState("Nenhum arquivo escolhido");
    const [cor, setCor] = useState("");

    const marcasDisponiveis = ["Nike", "Jordan", "Adidas", "Puma", "Vans", "Reebok", "Asics", "Mizuno"];

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImagem(file);
            setPreview(URL.createObjectURL(file));
            setFileName(file.name);
        }
    };

    const handleRemoveImage = () => {
        setImagem(null);
        setPreview(null);
        setFileName("Nenhum arquivo escolhido");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!imagem) {
            alert("Por favor, selecione uma imagem.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) {
            alert("Usuário não identificado. Faça login novamente.");
            return;
        }

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("numero", numero.toString());
        formData.append("preco", preco.toString());
        formData.append("marca", marca);
        formData.append("cor", cor);
        formData.append("imagem", imagem);
        formData.append("usuarioId", user.id);

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

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        if (savedTheme) {
            const darkMode = JSON.parse(savedTheme);
            setIsDarkMode(darkMode);
            document.body.style.backgroundColor = darkMode ? "#333" : "#ffffff";
            document.body.style.color = darkMode ? "#fff" : "#000";
        }
    }, []);


    return (
        <div style={{ ...styles.container, backgroundColor: isDarkMode ? "#333" : "#fff", color: isDarkMode ? "#fff" : "#000" }}>
            <div style={{ ...styles.card, backgroundColor: isDarkMode ? "#333" : "#fff", color: isDarkMode ? "#fff" : "#000" }}>
                <h2 style={styles.title}>Criar Anúncio</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formRow}>
                        <div style={styles.formColumn}>
                            <div style={styles.formGroup}>
                                <label>Nome:<span style={styles.mandatory}>*</span></label>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    style={styles.inputSmall}
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label>Preço:<span style={styles.mandatory}>*</span></label>
                                <input
                                    type="number"
                                    value={preco}
                                    onChange={(e) => setPreco(Number(e.target.value))}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.uploadContainer}>
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleImageChange}
                                style={styles.hiddenInput}
                            />
                            <Tooltip.Provider>
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                        <label htmlFor="fileInput" style={styles.uploadButton}>
                                            <Upload size={20} color="#fff" />
                                        </label>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content style={styles.tooltipContent} side="top">
                                            Adicionar Imagem
                                            <Tooltip.Arrow className="fill-black" />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            </Tooltip.Provider>
                            <span>{fileName}</span>
                            {preview && (
                                <div style={styles.previewContainer}>
                                    <img src={preview} alt="Prévia" style={styles.previewImage} />
                                    <button type="button" onClick={handleRemoveImage} style={styles.removeButton}>
                                        <X size={16} color="#fff" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label>Número:<span style={styles.mandatory}>*</span></label>
                        <input
                            type="number"
                            value={numero}
                            onChange={(e) => setNumero(Number(e.target.value))}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Marca:<span style={styles.mandatory}>*</span></label>
                        <select value={marca} onChange={(e) => setMarca(e.target.value)} style={styles.input} required>
                            <option value="">Selecione uma marca</option>
                            {marcasDisponiveis.map((marca, index) => (
                                <option key={index} value={marca}>{marca}</option>
                            ))}
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label>Cor:<span style={styles.mandatory}>*</span></label>
                        <input
                            type="text"
                            value={cor}
                            onChange={(e) => setCor(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.mandatory}>
                        <p>* Campo Obrigatório</p>
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
        padding: "40px 0",
        height: "50vh",
        backgroundColor: "#fff",
    },
    card: {
        width: "600px",
        padding: "40px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        textAlign: "center" as "center",
        display: "flex",
        flexDirection: "column" as "column",
        minHeight: "80vh",
    },
    title: {
        marginBottom: "20px",
        fontSize: "30px",
        fontWeight: "bold",
        backgroundColor: "#ff0000",
        color: "#fff",
        borderRadius: "30px",
    },
    formRow: {
        display: "flex",
        gap: "20px",
        alignItems: "center",
    },
    formColumn: {
        flex: 2,
    },
    uploadContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        gap: "10px",
    },
    formGroup: {
        marginBottom: "15px",
        textAlign: "left" as "left",
    },
    input: {
        width: "100%",
        padding: "8px",
        borderRadius: "30px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxSizing: "border-box" as "border-box",
    },
    inputSmall: {
        width: "100%",
        padding: "8px",
        borderRadius: "30px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxSizing: "border-box" as "border-box",
    },
    textareaSmall: {
        width: "100%",
        height: "80px",
        padding: "8px",
        borderRadius: "30px",
        border: "1px solid #ccc",
        fontSize: "16px",
        resize: "none" as "none",
        boxSizing: "border-box" as "border-box",
    },
    hiddenInput: {
        display: "none",
    },
    uploadButton: {
        backgroundColor: "#ff0000",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "50px",
        cursor: "pointer",
        fontSize: "14px",
    },
    previewContainer: {
        position: "relative" as "relative",
        display: "inline-block",
    },
    previewImage: {
        width: "300px",
        height: "200px",
        objectFit: "cover" as "cover",
        borderRadius: "5px",
    },
    removeButton: {
        position: "absolute" as "absolute",
        top: "5px",
        right: "5px",
        backgroundColor: "red",
        border: "none",
        borderRadius: "50%",
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#ff0000",
        color: "#fff",
        border: "none",
        borderRadius: "50px",
        cursor: "pointer",
        fontSize: "20px",
        fontWeight: "bold",
    },
    mandatory: {
        color: "#ff0000",
        fontWeight: "bold",
        justifySelf: "left",
    },
    tooltipContent: {
        backgroundColor: "black",
        color: "white",
        padding: "5px 10px",
        borderRadius: "5px",
        fontSize: "14px",
    },
};

export default Anuncio;
