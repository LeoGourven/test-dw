import { Roboto } from 'next/font/google';
import './globals.scss';
import { EditorContextProvider } from './lib/EditorContext';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
    title: 'Datawrapper Hiring Assignment'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${roboto.className} antialiased`}>
                <script async="" src="http://localhost:8097"></script>
                <div className="app">
                    <EditorContextProvider>
                        <main>{children}</main>
                    </EditorContextProvider>
                </div>
                <footer className="mt-6">
                    <p className="is-size-7 has-text-grey-light">
                        <a href="https://www.datawrapper.de/" target="_blank">
                            Datawrapper
                        </a>{' '}
                        hiring assignment
                    </p>
                </footer>
            </body>
        </html>
    );
}
