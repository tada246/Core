import { Image, Link } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown';

type Props = {
    content: string;
};

export default function Markdown(props: Props) {
    return (
        <ReactMarkdown
            components={{
                a: ({ children, href }) => (
                    <Link href={href} isExternal showAnchorIcon>
                        {children}
                    </Link>
                ),
                p: ({ children }) => <p className='my-4'>{children}</p>,
                img: ({ alt, src }) => (
                    <Image
                        className='w-full h-auto border-0 align-middle'
                        alt={alt}
                        src={src}
                    />
                ),
                h1: ({ children }) => (
                    <h1 className='text-4xl font-bold text-gray-900 leading-tight my-4'>
                        {children}
                    </h1>
                ),
                h2: ({ children }) => (
                    <h2 className='text-3xl font-bold text-gray-900 leading-tight my-4'>
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3 className='text-2xl font-bold text-gray-900 leading-tight my-4'>
                        {children}
                    </h3>
                ),
                h4: ({ children }) => (
                    <h4 className='text-xl font-bold text-gray-900 leading-tight my-4'>
                        {children}
                    </h4>
                ),
                h5: ({ children }) => (
                    <h5 className='text-lg font-bold text-gray-900 leading-tight my-4'>
                        {children}
                    </h5>
                ),
                h6: ({ children }) => (
                    <h6 className='text-base font-bold text-gray-900 leading-tight my-4'>
                        {children}
                    </h6>
                ),
                blockquote: ({ children }) => (
                    <blockquote className='text-gray-600 border-l-4 border-gray-200 pl-6 my-4'>
                        {children}
                    </blockquote>
                ),
                ul: ({ children }) => (
                    <ul className='list-disc list-inside my-4 pl-4'>
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className='list-decimal list-inside my-4 pl-4'>
                        {children}
                    </ol>
                ),
                li: ({ children }) => <li className='mb-2'>{children}</li>,
                hr: () => <hr className='border-t border-gray-300 my-6' />,
                code: ({ children }) => (
                    <code className='text-gray-800 font-mono bg-gray-100 p-1 rounded'>
                        {children}
                    </code>
                ),
                pre: ({ children }) => (
                    <pre className='text-gray-800 font-mono bg-gray-100 p-4 rounded my-4 whitespace-pre-wrap break-words'>
                        {children}
                    </pre>
                ),
                b: ({ children }) => <b className='font-bold'>{children}</b>,
                strong: ({ children }) => (
                    <strong className='font-bold'>{children}</strong>
                ),
                dfn: ({ children }) => <dfn className='italic'>{children}</dfn>,
                mark: ({ children }) => (
                    <mark className='bg-yellow-300 text-black font-bold italic'>
                        {children}
                    </mark>
                ),
                ins: ({ children }) => (
                    <ins className='bg-yellow-200 text-black no-underline'>
                        {children}
                    </ins>
                ),
                sub: ({ children }) => (
                    <sub className='text-xs align-baseline relative bottom-1'>
                        {children}
                    </sub>
                ),
                sup: ({ children }) => (
                    <sup className='text-xs align-baseline relative top-[-0.5em]'>
                        {children}
                    </sup>
                ),
                table: ({ children }) => (
                    <table className='min-w-full border-collapse my-4'>
                        {children}
                    </table>
                ),
                th: ({ children }) => (
                    <th className='border px-4 py-2 text-left bg-gray-100'>
                        {children}
                    </th>
                ),
                td: ({ children }) => (
                    <td className='border px-4 py-2 text-left'>{children}</td>
                ),
            }}
        >
            {props.content}
        </ReactMarkdown>
    );
}
