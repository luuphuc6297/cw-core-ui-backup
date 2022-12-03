import { CLIENT_EVENT, isActiveHotKey, TINY_MCE_KEY } from 'utils';
import { Editor } from '@tinymce/tinymce-react';
import './styles.css';

interface TinyMCEProps {
    value?: string;
    onChange: (value: string, editor: any) => void;
    onInit: (evt: any, editor: any) => void;
    placeholder?: string;
}

export const TinyMCE = ({ value, onChange, onInit, placeholder }: TinyMCEProps) => {
    return (
        <Editor
            apiKey={TINY_MCE_KEY}
            onInit={onInit}
            onEditorChange={onChange}
            value={value}
            inline
            init={{
                setup: (e) => {
                    e.on('keydown', (e) => {
                        if (e.code === 'Enter' && !isActiveHotKey(e)) {
                            const widgetEvent = new CustomEvent(CLIENT_EVENT.ENTER_SEND_MESSAGE, {
                                detail: e.target.textContent,
                            });
                            window.dispatchEvent(widgetEvent);
                            e.preventDefault();
                        }
                    });
                    e.on('init', function (event) {
                        e.selection.select(e.getBody(), true);
                        e.selection.collapse(false);
                        e.focus();
                    });
                },
                newline_behavior: 'linebreak',
                content_css: './styles.css',
                content_style: 'p { margin: 0px; }',
                height: '100%',
                width: '100%',
                placeholder: placeholder,
                statusbar: false,
                toolbar: false,
                menubar: false,
                inline: false,
                resize: 'both',
                plugins: [
                    'autoresize',
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'code',
                    'help',
                    'wordcount',
                    'importcss',
                ],
            }}
        />
    );
};
