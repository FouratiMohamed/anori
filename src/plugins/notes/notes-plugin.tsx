import { Input, Textarea } from "@components/Input";
import { AnoriPlugin, WidgetRenderProps } from "@utils/user-data/types";
import { ComponentProps, useRef, useState } from "react";
import './styles.scss';
import { useWidgetStorage } from "@utils/plugin";
import { translate } from "@translations/index";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRunAfterNextRender } from "@utils/hooks";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";

type PluginWidgetConfigType = {

};

const Mock = () => {
    const { t } = useTranslation();
    return (<div className="NotesWidget">
        <Input value={t('notes-plugin.exampleTitle')} className="note-title" spellCheck={false} />
        <div className="note-body-rendered">{t('notes-plugin.exampleText')}</div>
    </div>);
};


const Link = (props: ComponentProps<"a"> & ReactMarkdownProps) => {
    return (<a onClick={e => e.stopPropagation()} onFocus={e => e.stopPropagation()} {...props}/>);
}

const MainScreen = ({ config, instanceId }: WidgetRenderProps<PluginWidgetConfigType>) => {
    const switchEditing = (newIsEditing: boolean) => {
        if (newIsEditing) {
            runAfterNextRender(() => {
                if (bodyEditorRef.current) bodyEditorRef.current.focus();
            });
        }
        setIsEditing(newIsEditing);
    };

    const storage = useWidgetStorage<{title: string, body: string}>();
    const [title, setTitle] = storage.useValue('title', '');
    const [body, setBody] = storage.useValue('body', '');
    const [isEditing, setIsEditing] = useState(false);
    const [titleFocused, setTitleFocused] = useState(false);
    const bodyEditorRef = useRef<HTMLTextAreaElement>(null);
    const { t } = useTranslation();
    const runAfterNextRender = useRunAfterNextRender();

    return (<div className="NotesWidget">
        <Input
            value={title}
            onValueChange={setTitle}
            className="note-title"
            placeholder={t('notes-plugin.noteTitle')}
            spellCheck={titleFocused}
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
        />
        {isEditing && <Textarea
            value={body}
            onValueChange={setBody}
            className="note-body-editor"
            placeholder={t('notes-plugin.noteText')}
            onBlur={() => switchEditing(false)}
            ref={bodyEditorRef}
        />}
        {!isEditing && <div
            className="note-body-rendered"
            tabIndex={0}
            onFocus={() => switchEditing(true)}
            onClick={() => switchEditing(true)}
        >
            {!!body && <ReactMarkdown components={{a: Link}} remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>}
            {!body && <span className="notes-body-placeholder">{t('notes-plugin.noteText')}</span>}
        </div>}
    </div>);
};

const widgetDescriptorS = {
    id: 'notes-s',
    get name() {
        return translate('notes-plugin.widgetSizeSName');
    },
    configurationScreen: null,
    withAnimation: false,
    mainScreen: MainScreen,
    mock: Mock,
    size: {
        width: 2,
        height: 1,
    }
} as const;

const widgetDescriptorM = {
    id: 'notes-m',
    get name() {
        return translate('notes-plugin.widgetSizeMName');
    },
    configurationScreen: null,
    withAnimation: false,
    mainScreen: MainScreen,
    mock: Mock,
    size: {
        width: 2,
        height: 2,
    }
} as const;

const widgetDescriptorL = {
    id: 'notes-l',
    get name() {
        return translate('notes-plugin.widgetSizeLName');
    },
    configurationScreen: null,
    withAnimation: false,
    mainScreen: MainScreen,
    mock: Mock,
    size: {
        width: 3,
        height: 2,
    }
} as const;



export const notesPlugin = {
    id: 'notes-plugin',
    get name() {
        return translate('notes-plugin.name');
    },
    widgets: [
        widgetDescriptorS,
        widgetDescriptorM,
        widgetDescriptorL,
    ],
    configurationScreen: null,
} satisfies AnoriPlugin;