import Link from "next/link";
import { graphql } from "../gql";
import { graphqlClient } from "../lib/graphql-client";

const GetAllPostsDocument = graphql(/* GraphQL */ `
  query GetAllPosts($first: Int!) {
    postCollection(first: $first) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { postCollection } = await graphqlClient.request(GetAllPostsDocument, {
    first: 10,
  });

  return (
    <html>
      <head></head>
      <body>
        <nav>
          <ul>
            {postCollection?.edges?.map((edge) =>
              edge?.node ? (
                <li key={edge.node.id}>
                  <Link href={`/posts/${edge.node.slug}`}>
                    {edge.node.title}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
