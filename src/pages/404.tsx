import type { InferGetStaticPropsType } from 'next'
import React from 'react'
import { allDocs } from 'contentlayer/generated'
import { buildDocsTree } from 'src/utils/build-docs-tree'
import { defineStaticProps } from '../utils/next'
import { Container } from '../components/common/Container'
import { Icon } from 'src/components/common/Icon'
import { Heading } from 'src/components/landing-page/Heading'
import { Paragraph } from 'src/components/landing-page/Paragraph'
import { Label } from 'src/components/common/Label'

export const getStaticProps = defineStaticProps(async (_context) => {
  const tree = buildDocsTree(allDocs)
  return { props: { tree } }
})

const NotFound: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ tree }) => {
  return (
    <Container tree={tree}>
      <div
        style={{ minHeight: 'calc(100vh - 64px)' }}
        className="flex flex-col items-center justify-center space-y-8 px-4 md:px-8 lg:px-16"
      >
        <Heading level={1} className="flex items-center font-black">
          <span>404</span>
          <span className="ml-4 w-10 text-violet-500 dark:text-violet-400">
            <Icon name="broken-link" />
          </span>
        </Heading>
        <Paragraph className="pb-16 text-center">
          The URL you are looking for does not exist.
          <br />
          Hit <Label text="⌘K" /> to explore Contentlayer.
        </Paragraph>
      </div>
    </Container>
  )
}

export default NotFound
