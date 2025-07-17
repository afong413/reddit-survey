"use client"

import { cn } from "@/lib/utils"
import { forwardRef, HTMLAttributes, useEffect, useState } from "react"
import { decode } from "he"
import { Post } from "@/app/reddit/post/[id]/route"
import { LucideLoaderCircle } from "lucide-react"
import { motion } from "motion/react"
import { FactCheck, FactCheckMethod } from "@/components/ui/fact-check"

export type RedditPostData = {
  id: string
  factCheckMethod?: FactCheckMethod
}

function cleanHTML(html: string): string {
  // Remove any <p>...</p> that contains only whitespace or zero-width spaces
  return html.replace(/<p>(&#x200B;|\s|&nbsp;|&ZeroWidthSpace;)*<\/p>/g, "")
}

const RedditPost = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    postData: RedditPostData
  }
>(({ className, postData, ...props }, ref) => {
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetch(`/reddit/post/${postData.id}`).then(
        async (result) => (await result.json()) as Post,
      )
      setPost(post)
    }
    fetchPost()
  }, [postData.id])

  return (
    <div
      ref={ref}
      className={cn(
        "flex size-full rounded-2xl border border-stone-950 p-4 dark:border-stone-50",
        className,
      )}
      {...props}
    >
      {post ?
        <div className="flex size-full flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <div className="flex h-8 space-x-4">
              <img
                alt=""
                src={
                  post.author.pfp ??
                  "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
                }
                className="h-full rounded-full border border-stone-950 dark:border-stone-50"
              ></img>
              <div className="flex flex-col">
                <p className="text-xs font-bold">r/{post.subreddit}</p>
                <p className="text-xs">{post.author.username}</p>
              </div>
            </div>
            <h1 className="text-2xl font-semibold">{post.title}</h1>
          </div>
          {postData.factCheckMethod && (
            <FactCheck
              type={postData.factCheckMethod}
              context={
                post.context ?
                  post.context[postData.factCheckMethod]
                : undefined
              }
            />
          )}
          {post.image && (
            <img
              alt=""
              src={post.image}
              className="rounded-2xl border border-stone-950 dark:border-stone-50"
            ></img>
          )}
          {post.text && (
            <div
              className="flex flex-col *:space-y-4"
              dangerouslySetInnerHTML={{
                __html: cleanHTML(decode(post.text)),
              }}
            />
          )}
        </div>
      : <div className="flex w-full items-center justify-center py-6">
          <motion.div
            className="size-16"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          >
            <LucideLoaderCircle className="size-full" />
          </motion.div>
        </div>
      }
    </div>
  )
})
RedditPost.displayName = "RedditPost"

export { RedditPost }
