import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="text-black bg-conic-to-tl from-cyan-600 via-yellow-400 to-yellow-400">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
