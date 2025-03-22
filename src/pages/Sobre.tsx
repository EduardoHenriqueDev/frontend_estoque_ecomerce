import React from "react";

const Sobre: React.FC = () => {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Sobre Nós</h1>
                <p style={styles.subtitle}>Conheça mais sobre o nosso projeto e propósito.</p>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Nosso Objetivo</h2>
                    <p style={styles.sectionText}>
                        Este e-commerce foi desenvolvido como um projeto de aprendizado, com o objetivo de aprimorar e demonstrar habilidades técnicas
                        no desenvolvimento web. O foco está na criação de uma plataforma funcional e moderna, aplicando boas práticas de programação,
                        usabilidade e design responsivo. Além disso, buscamos simular um ambiente real de desenvolvimento, incluindo integração com um backend,
                        gerenciamento de estados e otimização de desempenho, proporcionando uma experiência completa tanto para desenvolvedores quanto para usuários finais.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Tecnologias Utilizadas</h2>
                    <p style={styles.sectionText}>
                        Utilizamos <strong>React</strong> com <strong>TypeScript</strong> no frontend para proporcionar uma interface dinâmica, modular e de fácil manutenção.
                        No backend, adotamos <strong>Java</strong> com <strong>SQL</strong>, garantindo uma estrutura robusta, segura e escalável para o gerenciamento dos dados.
                        Essa combinação de tecnologias permite um desempenho eficiente, além de facilitar futuras melhorias e expansões da plataforma.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Nossa Equipe</h2>
                    <p style={styles.sectionText}>
                        O projeto foi desenvolvido por
                        <a style={styles.link} href="https://www.linkedin.com/in/eduardo-henrique-14584128b/" target="_blank" rel="noopener noreferrer" ><strong>Eduardo Henrique</strong></a>, responsável pelo frontend, e
                        <a style={styles.link} href="https://www.linkedin.com/in/cauã-galvão-dev/" target="_blank" rel="noopener noreferrer"><strong>Cauã Galvão</strong></a>, responsável pelo backend.
                        Juntos, uniram suas especialidades para criar uma plataforma dinâmica e moderna.
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "20px",
    },
    card: {
        width: "100%",
        marginLeft: "100px",
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        textAlign: "center" as "center",
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: "18px",
        color: "#666",
        marginBottom: "20px",
    },
    section: {
        marginTop: "20px",
        textAlign: "left" as "left",
    },
    sectionTitle: {
        fontSize: "22px",
        color: "#444",
    },
    sectionText: {
        fontSize: "16px",
        color: "#555",
        lineHeight: "1.6",
    },
    link: {
        marginLeft: "5px",
        color: "#1C1C1C",
    }
};

export default Sobre;
