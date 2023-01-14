import Dexie, { Table } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { IMAGE_PREFIX, NO_IMAGE_PREFIX } from "../constants/movie.constants";
import Link from "next/link";
import Image from "next/image";

export interface FavoriteMovie {
  id?: number;
  poster_path: string;
  title: string;
}

export class FavoriteMovieDexie extends Dexie {
  favoriteMovies!: Table<FavoriteMovie>;

  constructor() {
    super("favoriteMoviesDatabase");
    this.version(1).stores({
      favoriteMovies: "++id, poster_path, title",
    });
  }
}

export const db = new FavoriteMovieDexie();

interface FavoriteProps {
  id: number;
  poster_path: string;
  title: string;
}
export const FavoriteButton = ({ id, poster_path, title }: FavoriteProps) => {
  const isFavorite = useLiveQuery(
    async () => !!(await db.favoriteMovies.get({ id })),
    [id]
  );

  const addFavoriteMovie = async () => {
    if (isFavorite) {
      await db.favoriteMovies.where("id").equals(id).delete();
    } else {
      await db.favoriteMovies.add({
        id,
        poster_path,
        title,
      });
    }
  };

  return (
    <button
      className={`text-stone-50 px-4 mt-4 py-2 rounded-lg disabled:bg-slate-400 ${
        isFavorite ? "bg-red-400" : "bg-blue-400"
      }`}
      onClick={addFavoriteMovie}
    >
      {isFavorite ? "Remove favorite" : "Add favorite"}
    </button>
  );
};

export const FavoriteList = () => {
  const favoriteMovies = useLiveQuery(
    async () => await db.favoriteMovies.toArray()
  );

  if (!favoriteMovies?.length) {
    return <></>;
  }

  return (
    <ul
      style={{
        overflowX: "scroll",
      }}
      className="mx-4 flex"
    >
      {favoriteMovies?.map((favoriteMovie) => (
        <li title={favoriteMovie.title} key={favoriteMovie.id}>
          <Link href={`/${favoriteMovie.id}`}>
            <a>
              <div className="w-24 h-32 m-4 bg-slate-500 justify-center items-center flex rounded-lg">
                <Image
                  alt={favoriteMovie.title}
                  className={`${
                    !favoriteMovie.poster_path ? "w-16" : ""
                  } rounded-lg`}
                  src={
                    !!favoriteMovie.poster_path
                      ? `${IMAGE_PREFIX}${favoriteMovie.poster_path}`
                      : NO_IMAGE_PREFIX
                  }
                />
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
