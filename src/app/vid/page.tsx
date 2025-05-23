"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const API_KEY = "AIzaSyCsnT6H1J_bBXcPIygeJhsjxNaVZXfXHYI"

interface Video {
  id: string
  title: string
  channelName: string
  thumbnail: string
  embedId: string
  description: string
  duration?: string
  views?: string
  categories?: string[]
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  nextPageToken?: string
  prevPageToken?: string
}

export default function VidPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [videos, setVideos] = useState<Video[]>([])
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
  })

  const fetchVideos = async (query: string, pageToken?: string) => {
    if (!query) return
    setIsLoading(true)
    try {
      // Build the URL with optional pageToken
      let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(
        query,
      )}&key=${API_KEY}`

      if (pageToken) {
        url += `&pageToken=${pageToken}`
      }

      const res = await fetch(url)
      const data = await res.json()

      // Extract pagination tokens
      const nextPageToken = data.nextPageToken || null
      const prevPageToken = data.prevPageToken || null

      // Calculate total pages (approximate since YouTube doesn't provide this directly)
      // YouTube API has a limit of 500 results (about 42 pages with 12 results per page)
      const totalPages = Math.min(42, Math.ceil(data.pageInfo?.totalResults / 12) || 1)

      const videoIds = data.items.map((item: any) => item.id.videoId).join(",")

      // Fetch video details for duration, viewCount
      const detailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`,
      )
      const detailsData = await detailsRes.json()

      const vids: Video[] = detailsData.items.map((item: any) => ({
        id: item.id,
        embedId: item.id,
        title: item.snippet.title,
        channelName: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high.url,
        description: item.snippet.description,
        duration: formatDuration(item.contentDetails.duration),
        views: formatViews(item.statistics.viewCount),
        categories: [], // no categories unless you want to add based on tags or titles
      }))

      setVideos(vids)
      setPagination({
        currentPage: prevPageToken ? pagination.currentPage : 1,
        totalPages,
        nextPageToken,
        prevPageToken,
      })
    } catch (error) {
      console.error("Error fetching videos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Format ISO 8601 duration to human-readable format
  const formatDuration = (isoDuration: string): string => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
    if (!match) return ""

    const hours = match[1] ? Number.parseInt(match[1].replace("H", "")) : 0
    const minutes = match[2] ? Number.parseInt(match[2].replace("M", "")) : 0
    const seconds = match[3] ? Number.parseInt(match[3].replace("S", "")) : 0

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Format view count to human-readable format
  const formatViews = (viewCount: string): string => {
    const count = Number.parseInt(viewCount)
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`
    }
    return `${count} views`
  }

  useEffect(() => {
    // Optionally fetch some default videos on mount
    fetchVideos("mental health students")
  }, [])

  const handleSearch = () => {
    fetchVideos(searchTerm)
    setActiveVideo(null)
  }

  const handleNextPage = () => {
    if (pagination.nextPageToken) {
      fetchVideos(searchTerm, pagination.nextPageToken)
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevPage = () => {
    if (pagination.prevPageToken) {
      fetchVideos(searchTerm, pagination.prevPageToken)
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pb-16">
      {/* Header and Search */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4 text-center pt-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Mental Health Resources for Students
          <motion.p
            className="max-w-1xl mx-auto text-lg md:text-xl font-medium text-center text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find curated videos and resources focused on supporting mental health and wellbeing specifically tailored for students.
          </motion.p>

          </motion.h1>
          <motion.div
            className="flex max-w-3xl mx-auto gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search videos..."
                className="pl-10 bg-background/80 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </motion.div>
        </div>
      </div>

      {/* Video player */}
      {activeVideo && (
        <motion.div
          className="container mx-auto max-w-6xl mt-8 rounded-xl overflow-hidden shadow-lg border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      )}

      {/* Videos grid */}
      <div className="container mx-auto max-w-6xl px-4 mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm mb-6"
              >
                <Skeleton className="aspect-video w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  className="rounded-xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveVideo(video.embedId)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="aspect-video w-full object-cover"
                    />
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-2 mb-1">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{video.channelName}</p>
                    {video.views && <p className="text-xs text-muted-foreground">{video.views}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-10 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={!pagination.prevPageToken}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="px-4 py-2 rounded-md bg-card/40 backdrop-blur-sm border border-border/50">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!pagination.nextPageToken}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground mt-12">No videos found.</p>
        )}
      </div>
    </div>
  )
}
