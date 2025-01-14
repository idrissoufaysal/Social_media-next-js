"use client";

import { useEffect, useRef } from "react";
import FroalaEditor from "froala-editor";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

type FroalaEditorComponentProps = {
    onChange: (content: string) => void; // Callback pour récupérer le contenu
    value?: string; // Contenu initial (optionnel)
};

export default function FroalaEditorComponent({
    onChange,
    value = "",
}: FroalaEditorComponentProps) {
    const editorRef = useRef<FroalaEditor | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            // Initialise l'éditeur Froala
            editorRef.current = new FroalaEditor(textareaRef.current, {
                events: {
                    contentChanged: function () {
                        // Récupère le contenu et le passe au callback
                        const content = this.html.get();
                        onChange(content);
                    },
                },
            });

            // Définit le contenu initial
            if (value) {
                editorRef.current?.html?.set(value);
            }
        }

        // Nettoie l'éditeur lors du démontage du composant
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
            }
        };
    }, [value, onChange]);

    return <textarea ref={textareaRef} />;
}