import { useEffect, useMemo, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

import 'highlight.js/styles/github.css'

/*
 * Descubre automáticamente todos los Markdown dentro de /docs.
 *
 * Ejemplo:
 *
 * /docs/README.md
 * /docs/architecture/index.md
 * /docs/architecture/routing.md
 * /docs/features/authentication.md
 *
 * Cada archivo se convierte en un loader que Vite podrá cargar
 * únicamente cuando sea necesario.
 */
const markdownFiles = import.meta.glob('/docs/**/*.md', {
  query: '?raw',
  import: 'default',
})

function formatTitle(value) {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function buildDocsTree() {
  const tree = {
    root: [],
  }

  Object.keys(markdownFiles).forEach((filePath) => {
    const relativePath = filePath.replace('/docs/', '')
    const parts = relativePath.split('/')

    const filename = parts.pop()
    const slug = filename.replace(/\.md$/, '')

    const category = parts.length > 0
      ? parts.join('/')
      : 'root'

    if (!tree[category]) {
      tree[category] = []
    }

    tree[category].push({
      filePath,
      filename,
      slug,
      category,
      title:
        slug === 'index'
          ? formatTitle(category === 'root' ? 'Documentation' : category)
          : formatTitle(slug),
    })
  })

  Object.values(tree).forEach((documents) => {
    documents.sort((a, b) => {
      // index.md primero, el resto alfabéticamente.
      if (a.slug === 'index') return -1
      if (b.slug === 'index') return 1

      return a.title.localeCompare(b.title)
    })
  })

  return tree
}

function getDocumentUrl(document) {
  if (document.category === 'root') {
    if (document.slug === 'README') {
      return '/docs'
    }

    return `/docs/${document.slug}`
  }

  if (document.slug === 'index') {
    return `/docs/${document.category}`
  }

  return `/docs/${document.category}/${document.slug}`
}

function findDocument(tree, category, slug) {
  if (category === 'root') {
    return tree.root.find((document) => document.slug === slug)
  }

  return tree[category]?.find(
    (document) => document.slug === slug
  )
}

export default function Docs() {
  const { '*': documentPath } = useParams()

  const docsTree = useMemo(() => {
    return buildDocsTree()
  }, [])

  const currentDocument = useMemo(() => {
    if (!documentPath) {
      return docsTree.root.find(
        (document) => document.slug === 'README'
      )
    }

    const parts = documentPath.split('/')

    if (parts.length === 1) {
      const [category] = parts

      return docsTree[category]?.find(
        (document) => document.slug === 'index'
      )
    }

    const slug = parts.pop()
    const category = parts.join('/')

    return findDocument(docsTree, category, slug)
  }, [documentPath, docsTree])

  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadDocument() {
      if (!currentDocument) {
        setContent('')
        return
      }

      setLoading(true)

      try {
        const loader = markdownFiles[currentDocument.filePath]

        if (!loader) {
          throw new Error(
            `Document not found: ${currentDocument.filePath}`
          )
        }

        const markdown = await loader()

        if (!cancelled) {
          setContent(markdown)
        }
      } catch (error) {
        console.error(error)

        if (!cancelled) {
          setContent(
            '# Error\n\nNo se pudo cargar este documento.'
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadDocument()

    return () => {
      cancelled = true
    }
  }, [currentDocument])

  const categories = Object.keys(docsTree)
    .filter((category) => category !== 'root')
    .sort()

  return (
    <div className="flex min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">

      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-72 shrink-0 overflow-y-auto border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="p-6">

          <div className="mb-8">
            <h1 className="text-lg font-semibold">
              Documentation
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              KurumClient
            </p>
          </div>

          <nav className="space-y-6">

            {/* README */}
            {docsTree.root?.length > 0 && (
              <div>
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  General
                </div>

                <div className="space-y-1">
                  {docsTree.root.map((document) => (
                    <NavLink
                      key={document.filePath}
                      to={getDocumentUrl(document)}
                      className={({ isActive }) =>
                        [
                          'block rounded-md px-3 py-2 text-sm transition',
                          isActive
                            ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-white'
                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white',
                        ].join(' ')
                      }
                    >
                      {document.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}

            {/* Categorías */}
            {categories.map((category) => {
              const documents = docsTree[category]

              return (
                <div key={category}>
                  <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {formatTitle(category)}
                  </div>

                  <div className="space-y-1">
                    {documents.map((document) => (
                      <NavLink
                        key={document.filePath}
                        to={getDocumentUrl(document)}
                        className={({ isActive }) =>
                          [
                            'block rounded-md px-3 py-2 text-sm transition',
                            isActive
                              ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-white'
                              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white',
                          ].join(' ')
                        }
                      >
                        {document.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            })}

          </nav>
        </div>
      </aside>

      {/* Contenido */}
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-5xl px-8 py-12 lg:px-12">

          {loading && (
            <div className="text-sm text-neutral-500">
              Loading...
            </div>
          )}

          {!loading && currentDocument && (
            <article className="prose prose-neutral max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {content}
              </ReactMarkdown>
            </article>
          )}

          {!loading && !currentDocument && (
            <div>
              <h1 className="text-2xl font-semibold">
                Document not found
              </h1>

              <p className="mt-2 text-neutral-500">
                El documento solicitado no existe.
              </p>
            </div>
          )}

        </div>
      </main>

    </div>
  )
}