import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="min-h-screen text-black bg-gradient-to-t from-blue-zodiac-600 to-blue-zodiac-500">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
